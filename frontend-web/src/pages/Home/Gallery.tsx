/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ApiContext } from '../../contexts/apiContextProvider';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const Gallery: React.FunctionComponent<{ selectedImageId: number }> = (
  props
) => {
  const apiService = useContext(ApiContext);
  const [image, setImage] = useState<any>();
  const { selectedImageId } = props;

  const getImage = useCallback(async () => {
    try {
      const images = await apiService.get(`/image/${selectedImageId}`);
      const buffer = images.data.imagefile.Body.data;
      const b64 = Buffer.from(buffer).toString('base64');
      const mimeType = images.data.imagefile.ContentType;
      return setImage({ b64, mimeType });
    } catch (err) {
      return console.log(err);
    }
  }, [apiService, selectedImageId]);

  useEffect(() => {
    getImage();
  }, [getImage]);

  return (
    <Container>
      <div>
        {image && (
          <img alt="" src={`data:${image.mimeType};base64,${image.b64}`} />
        )}
      </div>
    </Container>
  );
};

export default Gallery;
