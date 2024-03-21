import { Helmet } from 'react-helmet-async';
import { Invoices } from 'src/sections/invoices';

// ----------------------------------------------------------------------

export default function InvoicesPage() {
  return (
    <>
      <Helmet>
        <title> Invoices | EREngineers </title>
      </Helmet>

      <Invoices />
    </>
  );
}
