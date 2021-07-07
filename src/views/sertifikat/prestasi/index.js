import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import SertifikatPrestasi, {
  setSertifikatPrestasiData,
  setSertifikatPrestasiModal,
} from "../../../store/actions/sertifikat/prestasi";
import { Row } from "simple-flexbox";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import { Paper, Button, MenuItem } from "@material-ui/core";
import DetailButtonComponent from "../../../components/global-components/DetailButton";
import InputComponent from "../../../components/commons/form/input";
import Container from "../../../components/container";
import Modal from "./modal";
import debounce from "lodash.debounce";
import { history } from "../../../utils";
import { FOLDER_SERTIFIKAT_PRESTASI } from "../../../utils/constant";
import DetailContentLihatBerkas from "../../../components/global-components/DetailContent/LihatBerkas";

const Index = ({
  onSetSertifikatPrestasiModal,
  onSetSertifikatPrestasiData,
  pending,
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

  const setModal = (modalType, isOpen, data, folderName, fileName) => {
    onSetSertifikatPrestasiModal(modalType, isOpen, data, folderName, fileName);
    onSetSertifikatPrestasiData(data);
  };

  return (
    <Container>
      <Modal handleRefresh={(state) => handleRefresh(state)} />
      <Row className="m-3 justify-content-between">
        <Button
          color="primary"
          variant="contained"
          disabled={pending}
          onClick={() => setModal("add", true, null)}
        >
          Tambah Sertifikat Prestasi
        </Button>
        {/* <InputComponent
          onChange={(e) => handleSearchChange(e)}
          placeholder="Cari nama sertifikatPrestasi"
          endIcon={SearchIcon}
        /> */}
      </Row>
      <div className="m-3">
        <MaterialTable
          tableRef={tableRef}
          title="SertifikatPrestasi"
          columns={[
            {
              title: "No",
              field: "no",
              width: 40,
            },
            {
              title: "Berkas",
              render: ({ file_sertifikat }) => {
                return file_sertifikat ? (
                  <DetailContentLihatBerkas
                    onClick={() =>
                      setModal(
                        "show-document",
                        true,
                        "Sertifikat Prestasi",
                        FOLDER_SERTIFIKAT_PRESTASI,
                        file_sertifikat
                      )
                    }
                  />
                ) : (
                  <span>Belum ada berkas</span>
                );
              },
            },
            {
              title: "Tingkat Prestasi",
              render: ({ tingkat_prestasi }) => {
                return tingkat_prestasi ? tingkat_prestasi : "-";
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
                    {/* <MenuItem onClick={() => setModal("detail", true, rowData)}>
                      Lihat Detail
                    </MenuItem> */}
                    <MenuItem onClick={() => setModal("edit", true, rowData)}>
                      Edit Data
                    </MenuItem>
                    <MenuItem onClick={() => setModal("delete", true, rowData)}>
                      Hapus Data
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
              dispatch(SertifikatPrestasi.get(param, resolve));
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

const mapStateToProps = ({ sertifikatPrestasi: { pending } }) => {
  return { pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatPrestasiModal: (
      modalType,
      isOpen,
      title,
      folderName,
      fileName
    ) =>
      dispatch(
        setSertifikatPrestasiModal(
          modalType,
          isOpen,
          title,
          folderName,
          fileName
        )
      ),
    onSetSertifikatPrestasiData: (data) =>
      dispatch(setSertifikatPrestasiData(data)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
