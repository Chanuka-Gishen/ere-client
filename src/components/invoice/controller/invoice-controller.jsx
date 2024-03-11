import React, { useState } from 'react';
import { InvoiceView } from '../view/invoice-view';
import { Await } from 'react-router-dom';
import { backendAuthApi } from 'src/axios/instance/backend-axios-instance';
import { BACKEND_API } from 'src/axios/constant/backend-api';
import responseUtil from 'src/utils/responseUtil';
import { useSnackbar } from 'notistack';
import { SNACKBAR_VARIANT } from 'src/constants/snackbar-constants';

const InvoiceController = ({ workOrder, unit, customer, invoice }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);

    try {
      if (workOrder.workOrderInvoiceNumber) {
        // Make a GET request to the endpoint that generates the PDF
        const response = await fetch(
          BACKEND_API.WORK_ORDR_DOWNLOAD_INVOICE + workOrder.workOrderInvoiceNumber
        );

        // Check if the response is successful
        if (!response.ok) {
          throw new Error('Failed to download PDF');
        }

        // Convert the response data to a Blob
        const blob = await response.blob();

        // Create a temporary URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = `${workOrder.workOrderInvoiceNumber}.pdf`; // Set the filename for download
        document.body.appendChild(link);

        // Simulate a click on the link to trigger the download
        link.click();

        // Clean up: remove the link and revoke the temporary URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      // Handle error (e.g., show error message)
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <InvoiceView
      workOrder={workOrder}
      unit={unit}
      customer={customer}
      invoice={invoice}
      handleDownloadPdf={handleDownloadPdf}
      isDownloading={isDownloading}
    />
  );
};

export default InvoiceController;
