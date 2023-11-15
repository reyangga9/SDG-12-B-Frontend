import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'; // Import SweetAlertIcon

interface ConfirmationSweetAlertProps {
    title: string;
    text: string;
    icon?: SweetAlertIcon; // Use SweetAlertIcon as the type
}

export const ConfirmationSweetAlert = async ({
    title,
    text,
    icon,
}: ConfirmationSweetAlertProps): Promise<SweetAlertResult<SweetAlertIcon>> => {
    const result: SweetAlertResult<SweetAlertIcon> = await Swal.fire({
        title: title,
        text: text,
        icon: icon || 'warning',
        iconColor: '#ef4444',
        color: 'black',
        showCancelButton: true,
        confirmButtonColor: '#096C2F',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        customClass: {
            container: 'sweet-alert-container',
            popup: 'sweet-alert-popup',
            confirmButton: 'sweet-alert-confirm-button',
            cancelButton: 'sweet-alert-cancel-button',
        },
        willOpen: () => {
            const container = Swal.getContainer();
            const popup = Swal.getPopup();
            const confirmButton = Swal.getConfirmButton();
            const cancelButton = Swal.getCancelButton();

            if (container) {
                container.style.backdropFilter = 'blur(2px)';
            }
            if (popup) {
                popup.style.borderRadius = '12px';
            }
            if (confirmButton) {
                confirmButton.style.borderRadius = '10px';
            }
            if (cancelButton) {
                cancelButton.style.borderRadius = '10px';
            }
        },
    });

    return result;
};
