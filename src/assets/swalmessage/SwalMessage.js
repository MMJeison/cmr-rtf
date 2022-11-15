import Swal from 'sweetalert2';

export const SwalMessage = (title, text, icon, btnConfrm, timer) => {
    Swal.fire({
        toast: true,
        icon: icon,
        position: "top-end",
        title: title,
        text: text,
        showConfirmButton: btnConfrm,
        timer: timer,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      })
};