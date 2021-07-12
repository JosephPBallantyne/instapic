/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { ApiContext } from '../../contexts/apiContextProvider';
import Table from './Table';
import Gallery from './Gallery';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomePage: React.FunctionComponent = () => {
  const { register, handleSubmit } = useForm<any>();
  const apiService = useContext(ApiContext);

  const [imageData, setImageData] = useState<any[]>();
  const [selectedImageId, setSelectedImageId] = useState<number>(1);

  const getStaticData = useCallback(async () => {
    try {
      const images = await apiService.get('/image');
      return setImageData(images.data.images);
    } catch (err) {
      return console.log(err);
    }
  }, [apiService]);

  useEffect(() => {
    getStaticData();
  }, [getStaticData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('description', data.description);
      await apiService.post('/image/upload', formData, {
        contentType: 'multipart/form-data',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSection>
        <div>
          <div className="form-group column">
            <label htmlFor="file">imageUpload</label>
            <input
              className="form-control"
              id="file"
              type="file"
              accept="image/x-png,image/jpeg,image/gif"
              {...register('file')}
            />
            <input id="description" {...register('description')} />
            <Button type="submit" size="sm">
              Upload Image
            </Button>
          </div>
        </div>
      </FormSection>
      <Gallery selectedImageId={selectedImageId} />
      {imageData && (
        <Table data={imageData} setSelectedImageId={setSelectedImageId} />
      )}
    </form>
  );
};

export default HomePage;
