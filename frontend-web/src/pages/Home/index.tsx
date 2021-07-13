/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { ApiContext } from '../../contexts/apiContextProvider';
import Table from './Table';
import Gallery from './Gallery';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  height: 100%;
  /* width: 100%; */
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
`;

const HomePage: React.FunctionComponent = () => {
  const { register, handleSubmit } = useForm<any>();
  const apiService = useContext(ApiContext);
  const history = useHistory();

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
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection className="form-group">
          <input
            className="form-control my-2"
            id="file"
            type="file"
            accept="image/x-png,image/jpeg,image/gif"
            {...register('file')}
          />
          <input
            className="form-control my-2"
            id="description"
            placeholder="Description..."
            {...register('description')}
          />
          <label htmlFor="file" className="mb-2">
            png, jpeg or gif
          </label>

          <Button type="submit" size="sm" className="my-2">
            Upload Image
          </Button>
        </FormSection>
        <Gallery selectedImageId={selectedImageId} />
        {imageData && (
          <Table data={imageData} setSelectedImageId={setSelectedImageId} />
        )}
      </form>
    </Container>
  );
};

export default HomePage;
