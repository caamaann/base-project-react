import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import WaliKelas, {
  setWaliKelasData,
  setWaliKelasModal,
} from "../../../store/actions/wali-kelas";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Row } from "simple-flexbox";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Button, MenuItem } from "@material-ui/core";
import DetailButtonComponent from "../../../components/global-components/DetailButton";
import InputComponent from "../../../components/commons/form/input";
import SelectComponent from "../../../components/commons/form/select";
import Container from "../../../components/container";
import Modal from "./modal";
import debounce from "lodash.debounce";
import { history } from "../../../utils";

const Index = ({
  onSetWaliKelasModal,
  onSetWaliKelasData,
  pending,
  chosenMahasiswa,
  status,
  waliKelas,
}) => {
  const [searchText, setSearchText] = useState("");
  const path = window.location.pathname.split("/");
  const id = path.pop();
  const dispatch = useDispatch();
  const tableRef = useRef();

  const handleRefresh = (state) => {
    setSearchText(state);
    tableRef.current && tableRef.current.onQueryChange();
  };

  const delayedQuery = debounce((value) => {
    return handleRefresh(value);
  }, 500);

  const handleSearchChange = (e) => {
    delayedQuery(e.target.value);
  };

  const setModal = (modalType, isOpen, data) => {
    onSetWaliKelasModal(modalType, isOpen);
    onSetWaliKelasData(data);
  };

  const onSubmit = () => {
    const param = {
      beasiswa_id: id,
      mahasiswa_id: chosenMahasiswa[0]?.mahasiswa_id,
    };
    const callback = () => {
      history.push("/wali-kelas/beasiswa");
    };
    dispatch(WaliKelas.post(param, callback));
  };

  useEffect(() => {
    getPendaftarBeasiswa();
  }, []);

  const getPendaftarBeasiswa = () =>
    dispatch(WaliKelas.getAllPendaftar({ beasiswa_id: id }));

  let dataPendaftar;
  if (waliKelas.data) {
    let temp = waliKelas.data.data.data;
    dataPendaftar = temp?.map((item, index) => {
      return {
        no: index + 1,
        ...item,
      };
    });
  }

  return (
    <Container>
      <Modal handleRefresh={(state) => handleRefresh(state)} />
      <Row className="m-3 justify-content-between">
        <InputComponent
          onChange={(e) => handleSearchChange(e)}
          placeholder="Cari nama mahasiswa"
          endIcon={SearchIcon}
        />
        {!status && chosenMahasiswa?.length === 1 && (
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSubmit()}
            disabled={pending}
          >
            Submit
          </Button>
        )}
        {/* {pending && (
          <CircularProgress
            // size={14}
            color="primary"
            // style={{ marginRight: 10 }}
          />
        )} */}
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="WaliKelas"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
            },
            {
              title: "NIM",
              render: ({ nim }) => {
                return nim ? nim : "-";
              },
            },
            {
              title: "Nama",
              render: ({ nama }) => {
                return nama ? <div className="py-3">{nama}</div> : "-";
              },
            },
            {
              title: "IPK",
              render: ({ ipk }) => {
                return ipk ? ipk : "-";
              },
            },
            {
              title: "Penghasilan Orangtua",
              render: ({
                penghasilan_ayah,
                penghasilan_ibu,
                penghasilan_sambilan_ayah,
                penghasilan_sambilan_ibu,
              }) => {
                let total = 0;
                if (
                  penghasilan_ayah ||
                  penghasilan_ibu ||
                  penghasilan_sambilan_ayah ||
                  penghasilan_sambilan_ibu
                ) {
                  total =
                    parseInt(penghasilan_ayah) +
                    parseInt(penghasilan_ibu) +
                    parseInt(penghasilan_sambilan_ayah) +
                    parseInt(penghasilan_sambilan_ibu);
                }
                return penghasilan_ayah ||
                  penghasilan_ibu ||
                  penghasilan_sambilan_ayah ||
                  penghasilan_sambilan_ibu
                  ? "Rp " +
                      total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                  : "-";
              },
            },
            {
              title: "Skor",
              render: ({ skor_akhir }) => {
                return skor_akhir ? skor_akhir : "-";
              },
            },
          ]}
          data={
            // (q) =>
            // new Promise((resolve) => {
            //   let param = {
            //     page: q.page + 1,
            //     length: 10,
            //     search_text: searchText,
            //     beasiswa_id: id,
            //   };
            //   dispatch(WaliKelas.getPendaftar(param, resolve));
            // })
            dataPendaftar
          }
          isLoading={pending}
          options={{
            pageSize: 10,
            paginationType: "stepped",
            pageSizeOptions: [],
            showTitle: false,
            search: false,
            sorting: false,
            headerStyle: {
              backgroundColor: "#fff",
              fontWeight: "bold",
            },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: "Tidak ada data",
            },
          }}
          components={{
            Toolbar: () => <div />,
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
        />
      </div>
    </Container>
  );
};

const mapStateToProps = ({ waliKelas, beasiswa: { data: dataBeasiswa } }) => {
  const { pending, data } = waliKelas;
  const status = dataBeasiswa?.status;
  const chosenMahasiswa = data?.data?.data;
  return { pending, chosenMahasiswa, status, waliKelas };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetWaliKelasModal: (modalType, isOpen) =>
      dispatch(setWaliKelasModal(modalType, isOpen)),
    onSetWaliKelasData: (data) => dispatch(setWaliKelasData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
