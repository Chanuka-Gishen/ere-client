import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { UploadView } from '../view/upload-view';
import { useDropzone } from 'react-dropzone';

const UploadController = ({
  selectedFiles,
  setSelectedFiles,
  isOpen,
  handleClose,
  handleSubmit,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const updatedFiles = acceptedFiles.map((file) => ({
      image: file,
      status: 'new',
    }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
  });

  const handleRemove = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file, i) => i !== index));
  };

  return (
    <UploadView
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      selectedFiles={selectedFiles}
      handleRemove={handleRemove}
      open={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    />
  );
};

export default UploadController;

UploadController.PropTypes = {
  selectedFiles: PropTypes.array.isRequired,
  setSelectedFiles: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
