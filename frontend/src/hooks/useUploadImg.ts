import React, { useCallback, useState } from 'react';
import { errorToast } from '../utils/toasts';
import { UPLOAD_IMG_URL } from './../utils/constants';

const useUploadImg = (avatar: string) => {
  const [img, setImg] = useState<File | null>(null);
  const [processedImg, setProcessedImg] = useState<string | null>(avatar);

  const handleProcessImg = useCallback(async (image: File) => {
    const fileImage = new FormData();
    fileImage.append('upload_preset', 'realshare');
    fileImage.append('file', image as File);
    fileImage.append('cloud_name', 'spedwagon');
    await fetch(UPLOAD_IMG_URL, {
      method: 'post',
      body: fileImage,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProcessedImg(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
        errorToast('Image was not processed!');
      });
  }, []);
  const deleteImg = useCallback(() => setImg(null), []);

  return {
    handleProcessImg,
    img,
    deleteImg,
    setImg,
    processedImg,
    setProcessedImg,
  };
};

export default useUploadImg;
