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
import Beasiswa from "./views/beasiswa";
import AddBeasiswa from "./views/beasiswa/add";

const theme = createMuiTheme({
  palette: {
    primary: {
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
        fontFamily: "Circular Std Book",
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
            roles={["admin", "waliKelas", "ketuaProdi", "ketuaJurusan", "pd3"]}
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
            head={["Profil"]}
            path="/profile"
            roles={["mahasiswa"]}
            exact
            component={Index}
          />
          <PrivateRoute
            head={["Beasiswa"]}
            path="/beasiswa"
            roles={["pd3"]}
            exact
            component={Beasiswa}
          />
          <PrivateRoute
            head={["Beasiswa", "Tambah Beasiswa"]}
            path="/beasiswa/add"
            roles={["pd3"]}
            exact
            goBack
            component={AddBeasiswa}
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
