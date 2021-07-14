/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext, useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { ApiContext } from '../../contexts/apiContextProvider';
import { useAppSelector } from '../../redux/hooks';
import Table from './Table';
import Gallery from './Gallery';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Frame = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 800px;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
`;

const HomePage: React.FunctionComponent = () => {
  const { register, handleSubmit } = useForm<any>();
  const apiService = useContext(ApiContext);
  const auth = useAppSelector((state) => state.auth);

  const [imageData, setImageData] = useState<any[]>();
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<number>(1);
  const [failed, setFailed] = useState(false);

  const getStaticData = useCallback(async () => {
    try {
      setLoading(false);
      const images = await apiService.get('/image');
      return setImageData(images.data.images);
    } catch (err) {
      return console.log(err);
    }
  }, [apiService, loading]);

  useEffect(() => {
    getStaticData();
  }, [getStaticData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      setFailed(false);
      const formData = new FormData();
      formData.append('file', data.file[0]);
      formData.append('description', data.description);
      const res = await apiService.post('/image/upload', formData, {
        contentType: 'multipart/form-data',
      });
      setSelectedImageId(res.data.id);
      setLoading(true);
    } catch (err) {
      setFailed(true);
      console.log(err);
    }
  };

  return (
    <Frame>
      <Container>
        {!auth.authenticated && (
          <span>Please sign up or log in to view images!</span>
        )}
        {auth.authenticated && (
          <FormSection>
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
                <div>
                  <Button type="submit" size="sm" className="my-2">
                    Upload Image
                  </Button>
                </div>
                <label htmlFor="file" className="mb-4">
                  File types accepted: PNG, JPEG and GIF
                </label>
                {failed && (
                  <p
                    style={{ color: 'red', fontSize: '14px' }}
                    className="my-2"
                  >
                    Image upload failed
                  </p>
                )}
              </FormSection>
              <Gallery selectedImageId={selectedImageId} />
            </form>
            {imageData && (
              <Table data={imageData} setSelectedImageId={setSelectedImageId} />
            )}
          </FormSection>
        )}
      </Container>
    </Frame>
  );
};

export default HomePage;
