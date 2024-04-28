import { Helmet } from 'react-helmet-async';
import { EmployeeDetails } from 'src/sections/employee';

// ----------------------------------------------------------------------

export default function EmployeeDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Details | EREngineers </title>
      </Helmet>

      <EmployeeDetails />
    </>
  );
}
