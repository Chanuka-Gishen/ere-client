import { Helmet } from 'react-helmet-async';
import { JobDetails } from 'src/sections/job-details';

// ----------------------------------------------------------------------

export default function JobDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Details | EREngineers </title>
      </Helmet>

      <JobDetails />
    </>
  );
}
