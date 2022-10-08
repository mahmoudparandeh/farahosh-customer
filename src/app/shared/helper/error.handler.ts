import Swal from 'sweetalert2';

export class ErrorHandler {
  static showError(error: any): void {
    switch (error.status) {
      case 400: {
        let errorMessage = '';
        for (let err of error.error.errs) {
          errorMessage += err.ErrorSource + ' : ' + err.ErrorMessage + '\n';
        }

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        }).then();
        break;
      }
      case 404: {
        Swal.fire({
          title: 'Error!',
          text: error.error.jsonResult.Message,
          icon: 'error',
          confirmButtonText: 'OK',
        }).then();
        break;
      }
      case 500: {
        Swal.fire({
          title: 'Error!',
          text: 'Server Error',
          icon: 'error',
          confirmButtonText: 'OK',
        }).then();
        break;
      }
    }
  }
}
