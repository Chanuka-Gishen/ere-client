import React, { useState } from 'react';

import { OverviewDetailsView } from '../view/overview-details-view';

const OverviewDetailsController = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [jobList, setJobList] = useState([1, 2]);
  const [openedItem, setOpenedItem] = useState(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const handleOpenImageUploader = () => {
    setIsUploaderOpen(true);
  };

  const handleCloseImageUploader = () => {
    setIsUploaderOpen(false);
  };

  const handleExpand = (index) => {
    setOpenedItem(index === openedItem ? null : index);
  };

  const handleUploadImages = () => {};

  return (
    <OverviewDetailsView
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
      isUploaderOpen={isUploaderOpen}
      handleOpenImageUploader={handleOpenImageUploader}
      handleCloseImageUploader={handleCloseImageUploader}
      handleUploadImages={handleUploadImages}
      jobList={jobList}
      openedItem={openedItem}
      handleExpand={handleExpand}
    />
  );
};

export default OverviewDetailsController;
