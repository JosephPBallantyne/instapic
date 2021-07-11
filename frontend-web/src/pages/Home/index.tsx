/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts/apiContextProvider';

const FormSection = styled.div`
  display: flex;
  flex-direction: row;
`;

const HomePage: React.FunctionComponent = () => {
  const { register, handleSubmit } = useForm<any>();
  const apiService = useContext(ApiContext);

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append('file', data.file[0]);
      await apiService.post('/image/upload', formData);
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
              {...register('file')}
            />
            <Button type="submit" size="sm">
              Upload Image
            </Button>
          </div>
        </div>
      </FormSection>
    </form>
  );
};

export default HomePage;
