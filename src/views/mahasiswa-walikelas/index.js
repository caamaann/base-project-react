import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import WaliKelas, {
  setWaliKelasData,
  setWaliKelasModal,
} from "../../store/actions/wali-kelas";
import { Row } from "simple-flexbox";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Button, MenuItem } from "@material-ui/core";
import DetailButtonComponent from "../../components/global-components/DetailButton";
import InputComponent from "../../components/commons/form/input";
import Container from "../../components/container";
import Modal from "./modal";
import debounce from "lodash.debounce";

const Index = ({
  onSetWaliKelasModal,
  onSetWaliKelasData,
  pending,
  jurusan,
  programStudi,
}) => {
  const [searchText, setSearchText] = useState("");
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

  return (
    <Container>
      <Modal handleRefresh={(state) => handleRefresh(state)} />
      <Row className="m-3 justify-content-between">
        <div></div>
        <InputComponent
          onChange={(e) => handleSearchChange(e)}
          placeholder="Cari nama mahasiswa"
          endIcon={SearchIcon}
        />
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
              title: "Nama Mahasiswa",
              render: ({ nama }) => {
                return nama ? nama : "-";
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
              render: ({ orang_tua_mahasiswa }) => {
                let total = 0;
                if (orang_tua_mahasiswa) {
                  total =
                    parseInt(orang_tua_mahasiswa.penghasilan_ayah) +
                    parseInt(orang_tua_mahasiswa.penghasilan_ibu) +
                    parseInt(orang_tua_mahasiswa.penghasilan_sambilan_ayah) +
                    parseInt(orang_tua_mahasiswa.penghasilan_sambilan_ibu);
                }
                return orang_tua_mahasiswa
                  ? "Rp " +
                      total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                  : "-";
              },
            },
            {
              title: "Jumlah Tanggungan",
              render: ({ saudara_mahasiswa, orang_tua_mahasiswa }) => {
                let filter = saudara_mahasiswa.filter(
                  (item) => item.status_pekerjaan === "Belum bekerja"
                );
                let total = filter.length + 1;
                if (orang_tua_mahasiswa) {
                  if (
                    orang_tua_mahasiswa.penghasilan_ayah === 0 &&
                    orang_tua_mahasiswa.penghasilan_sambilan_ayah === 0
                  ) {
                    total++;
                  }
                  if (
                    orang_tua_mahasiswa.penghasilan_ibu === 0 &&
                    orang_tua_mahasiswa.penghasilan_sambilan_ibu === 0
                  ) {
                    total++;
                  }
                }
                return total;
              },
            },
            {
              title: "Aksi",
              width: 80,
              cellStyle: {
                paddingLeft: 0,
              },
              render: (rowData) => {
                return (
                  <DetailButtonComponent>
                    <MenuItem onClick={() => setModal("detail", true, rowData)}>
                      Lihat Detail
                    </MenuItem>
                  </DetailButtonComponent>
                );
              },
            },
          ]}
          data={(q) =>
            new Promise((resolve) => {
              let param = {
                page: q.page + 1,
                length: 10,
                search_text: searchText,
              };
              dispatch(WaliKelas.getMahasiswa(param, resolve));
            })
          }
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

const mapStateToProps = ({ waliKelas: { pending }, jurusan, programStudi }) => {
  return { pending, jurusan, programStudi };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetWaliKelasModal: (modalType, isOpen) =>
      dispatch(setWaliKelasModal(modalType, isOpen)),
    onSetWaliKelasData: (data) => dispatch(setWaliKelasData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
