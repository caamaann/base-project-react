export const regexPassword = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
export const regexEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const FOLDER_BERKAS_WAJIB = "berkas_wajib";
export const FOLDER_SERTIFIKAT_WAJIB = "sertifikat_wajib";
export const FOLDER_SERTIFIKAT_PRESTASI = "sertifikat_prestasi";
export const FOLDER_SERTIFIKAT_ORGANISASI = "sertifikat_organisasi";

export const optionsAHP = [
  {
    value: -7,
    label: 9,
  },
  {
    value: -6,
    label: 8,
  },
  {
    value: -5,
    label: 7,
  },
  {
    value: -4,
    label: 6,
  },
  {
    value: -3,
    label: 5,
  },
  {
    value: -2,
    label: 4,
  },
  {
    value: -1,
    label: 3,
  },
  {
    value: 0,
    label: 2,
  },
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 6,
    label: 6,
  },
  {
    value: 7,
    label: 7,
  },
  {
    value: 8,
    label: 8,
  },
  {
    value: 9,
    label: 9,
  },
];

export const optionsSertifikatPrestasi = [
  {
    value: "Internasional",
    label: "Internasional",
  },
  {
    value: "Nasional",
    label: "Nasional",
  },
  {
    value: "Provinsi",
    label: "Provinsi",
  },
  {
    value: "Kota",
    label: "Kota",
  },
];

export const optionsSertifikatOrganisasi = [
  {
    value: "Pengurus Organisasi",
    label: "Pengurus Organisasi",
  },
  {
    value: "Kepanitiaan Program Kerja Kemahasiswaan",
    label: "Kepanitiaan Program Kerja Kemahasiswaan",
  },
];
