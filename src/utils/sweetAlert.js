import Swal from "sweetalert2";

const color = { primary: "#A62C2C", tertiary: "#222831" };

export const successSwal = async (title = "", text = "") => {
  return Swal.fire({
    icon: "success",
    title: `${title} Success`,
    text: text,
  });
};

export const errorSwal = async (title = "", text = "") => {
  return Swal.fire({
    icon: "error",
    title: `${title}`,
    text: text,
  });
};

export const confirmSwal = async (text = "") => {
  const result = await Swal.fire({
    title: `Are you sure to ${text}`,
    text: `This will make some changes`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: color.primary,
    confirmButtonText: "Yes",
    cancelButtonColor: color.tertiary,
    cancelButtonText: "Cancel",
  });
  return result.isConfirmed;
};
