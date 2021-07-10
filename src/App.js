import { Route, Switch } from "react-router-dom";
import Layout from "./components/layout";
import PrivateRoute from "./components/commons/privateRoute";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

// views
import Index from "./views/Index";
import Login from "./views/login";
import Jurusan from "./views/master/jurusan";
import ProgramStudi from "./views/master/program-studi";
import UserMahasiswa from "./views/user/mahasiswa";
import UserWaliKelas from "./views/user/wali-kelas";
import UserKetuaProdi from "./views/user/ketua-program-studi";
import UserKetuaJurusan from "./views/user/ketua-jurusan";
import UserPD3 from "./views/user/pembantu-direktrur-3";
import Dashboard from "./views/dashboard";
import Beasiswa from "./views/beasiswa-pd3";
import AddBeasiswa from "./views/beasiswa-pd3/add";
import EditBeasiswa from "./views/beasiswa-pd3/edit";
import DetailBeasiswa from "./views/beasiswa-pd3/detail";
import Profile from "./views/profile";
import OrangTua from "./views/orang-tua";
import Saudara from "./views/saudara";
import Berkas from "./views/berkas";
import SertifikatPrestasi from "./views/sertifikat/prestasi";
import SertifikatOrganisasi from "./views/sertifikat/organisasi";
import BeasiswaMahasiswa from "./views/beasiswa-mahasiswa";
import DetailBeasiswaMahasiswa from "./views/beasiswa-mahasiswa/detail";
import BeasiswaWaliKelas from "./views/beasiswa-walikelas";
import DetailBeasiswaWaliKelas from "./views/beasiswa-walikelas/detail";
import BeasiswaKetuaProdi from "./views/beasiswa-ketuaprodi";
import DetailBeasiswaKetuaProdi from "./views/beasiswa-ketuaprodi/detail";
import BeasiswaKetuaJurusan from "./views/beasiswa-ketuajurusan";
import DetailBeasiswaKetuaJurusan from "./views/beasiswa-ketuajurusan/detail";
import MahasiswaWaliKelas from "./views/mahasiswa-walikelas";
import KuotaBeasiswa from "./views/beasiswa-pd3/kuota";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00008B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#00008B",
      contrastText: "#FFFFFF",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: [
      "Poppins",
      "Circular Std Book",
      "Roboto",
      "Segoe UI",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ],
  },
});

Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      container: {
        marginTop: 20,
        border: "1px solid #EFF0F2",
        minHeight: 300,
        borderRadius: 5,
        backgroundColor: "#FCFCFC",
      },
      toolbar: {
        // backgroundColor: "red",
        borderBottom: "1px solid #EFF0F2",
      },
      root: {
        width: "100%",
      },
      editorContainer: {
        padding: 20,
        fontFamily: "Poppins",
        fontSize: 14,
        lineHeight: 1.6,
        color: "#7F8388",
      },
    },
  },
});

const App = () => {
  const ContentRoute = () => {
    return (
      <Layout>
        <Switch>
          <PrivateRoute
            head={["Dashboard"]}
            path="/dashboard"
            roles={["admin"]}
            exact
            component={Dashboard}
          />
          <PrivateRoute
            head={["Data Master", "Jurusan"]}
            path="/jurusan"
            roles={["admin"]}
            exact
            component={Jurusan}
          />
          <PrivateRoute
            head={["Data Master", "Program Studi"]}
            path="/program-studi"
            roles={["admin"]}
            exact
            component={ProgramStudi}
          />
          <PrivateRoute
            head={["User", "Mahasiswa"]}
            path="/user/mahasiswa"
            roles={["admin"]}
            exact
            component={UserMahasiswa}
          />
          <PrivateRoute
            head={["User", "Wali Kelas"]}
            path="/user/wali-kelas"
            roles={["admin"]}
            exact
            component={UserWaliKelas}
          />
          <PrivateRoute
            head={["User", "Ketua Program Studi"]}
            path="/user/ketua-program-studi"
            roles={["admin"]}
            exact
            component={UserKetuaProdi}
          />
          <PrivateRoute
            head={["User", "Ketua Jurusan"]}
            path="/user/ketua-jurusan"
            roles={["admin"]}
            exact
            component={UserKetuaJurusan}
          />
          <PrivateRoute
            head={["User", "Pembantu Direktur 3"]}
            path="/user/pembantu-direktur-3"
            roles={["admin"]}
            exact
            component={UserPD3}
          />
          <PrivateRoute
            head={["Profil Mahasiswa"]}
            path="/profile"
            roles={["mahasiswa"]}
            exact
            component={Profile}
          />
          <PrivateRoute
            head={["Beasiswa"]}
            path="/pd3/beasiswa"
            roles={["pd3"]}
            exact
            component={Beasiswa}
          />
          <PrivateRoute
            head={["Beasiswa", "Tambah Beasiswa"]}
            path="/pd3/beasiswa/add"
            roles={["pd3"]}
            exact
            goBack
            component={AddBeasiswa}
          />
          <PrivateRoute
            head={["Beasiswa", "Edit Beasiswa"]}
            path="/pd3/beasiswa/edit/:id"
            roles={["pd3"]}
            exact
            goBack
            component={EditBeasiswa}
          />
          <PrivateRoute
            head={["Beasiswa", "Detail Beasiswa"]}
            path="/pd3/beasiswa/detail/:id"
            roles={["pd3"]}
            exact
            goBack
            component={DetailBeasiswa}
          />
          <PrivateRoute
            head={["Beasiswa"]}
            path="/mahasiswa/beasiswa"
            roles={["mahasiswa"]}
            exact
            component={BeasiswaMahasiswa}
          />
          <PrivateRoute
            head={["Beasiswa", "Detail Beasiswa"]}
            path="/mahasiswa/beasiswa/detail/:id"
            roles={["mahasiswa"]}
            exact
            goBack
            component={DetailBeasiswaMahasiswa}
          />
          <PrivateRoute
            head={["Beasiswa"]}
            path="/wali-kelas/beasiswa"
            roles={["walikelas"]}
            exact
            component={BeasiswaWaliKelas}
          />
          <PrivateRoute
            head={["Beasiswa", "Detail Beasiswa"]}
            path="/wali-kelas/beasiswa/detail/:id"
            roles={["walikelas"]}
            exact
            goBack
            component={DetailBeasiswaWaliKelas}
          />
          <PrivateRoute
            head={["Beasiswa"]}
            path="/ketua-prodi/beasiswa"
            roles={["ketuaprodi"]}
            exact
            component={BeasiswaKetuaProdi}
          />
          <PrivateRoute
            head={["Beasiswa", "Detail Beasiswa"]}
            path="/ketua-prodi/beasiswa/detail/:id"
            roles={["ketuaprodi"]}
            exact
            goBack
            component={DetailBeasiswaKetuaProdi}
          />
          <PrivateRoute
            head={["Beasiswa"]}
            path="/ketua-jurusan/beasiswa"
            roles={["ketuajurusan"]}
            exact
            component={BeasiswaKetuaJurusan}
          />
          <PrivateRoute
            head={["Beasiswa", "Detail Beasiswa"]}
            path="/ketua-jurusan/beasiswa/detail/:id"
            roles={["ketuajurusan"]}
            exact
            goBack
            component={DetailBeasiswaKetuaJurusan}
          />
          <PrivateRoute
            head={["Data Orang Tua"]}
            path="/orang-tua"
            roles={["mahasiswa"]}
            exact
            component={OrangTua}
          />
          <PrivateRoute
            head={["Data Saudara"]}
            path="/saudara"
            roles={["mahasiswa"]}
            exact
            component={Saudara}
          />
          <PrivateRoute
            head={["Data Berkas"]}
            path="/data-berkas"
            roles={["mahasiswa"]}
            exact
            component={Berkas}
          />
          <PrivateRoute
            head={["Sertifikat", "Organisasi"]}
            path="/sertifikat/organisasi"
            roles={["mahasiswa"]}
            exact
            component={SertifikatOrganisasi}
          />
          <PrivateRoute
            head={["Sertifikat", "Prestasi"]}
            path="/sertifikat/prestasi"
            roles={["mahasiswa"]}
            exact
            component={SertifikatPrestasi}
          />
          <PrivateRoute
            head={["Mahasiswa"]}
            path="/wali-kelas/mahasiswa"
            roles={["walikelas"]}
            exact
            component={MahasiswaWaliKelas}
          />
          <PrivateRoute
            head={["Beasiswa", "Kuota Beasiswa"]}
            path="/pd3/beasiswa/kuota/:id"
            roles={["pd3"]}
            exact
            component={KuotaBeasiswa}
          />
          <PrivateRoute roles={[]} exact component={() => <div></div>} />
        </Switch>
      </Layout>
    );
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          {/* <Route path="/" exact component={Index} /> */}
          <Route path="/login" exact component={Login} />
          <Route component={ContentRoute} />
        </Switch>
      </ThemeProvider>
    </>
  );
};

export default App;
