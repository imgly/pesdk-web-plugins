import React, { useContext } from 'react';

import {
  MetaInformationTitle,
  MetaInformationLabel,
  MetaInformationText,
  MetaInformationCaption,
  MetaInformationContainer,
  DetailsRow,
  DetailsContainer,
} from './components/Elements';
import { gettyStore } from './helpers';
import { LanguageContext } from './context/LanguageContext';

export const GettyImagesMetaInformation: React.FC = () => {
  const { img } = gettyStore.get();
  const { meta } = useContext(LanguageContext);

  if (!img) {
    return null;
  }

  const { id, title, caption, license_model, collection_name, asset_family } =
    img;

  return (
    <MetaInformationContainer data-test="GettyMetaInformation">
      {title && <MetaInformationTitle>{title}</MetaInformationTitle>}
      {caption && title !== caption && (
        <MetaInformationCaption>{caption}</MetaInformationCaption>
      )}
      <DetailsContainer>
        {id && asset_family && (
          <DetailsRow>
            <MetaInformationLabel>{`${meta.id.labels[asset_family]}:`}</MetaInformationLabel>
            <MetaInformationText>{id}</MetaInformationText>
          </DetailsRow>
        )}
        {license_model && (
          <DetailsRow>
            <MetaInformationLabel>{`${meta.license_model.label}:`}</MetaInformationLabel>
            <MetaInformationText>
              {meta.license_model.items[license_model]}
            </MetaInformationText>
          </DetailsRow>
        )}
        {collection_name && (
          <DetailsRow>
            <MetaInformationLabel>{`${meta.collection_name}:`}</MetaInformationLabel>
            <MetaInformationText>{collection_name}</MetaInformationText>
          </DetailsRow>
        )}
      </DetailsContainer>
    </MetaInformationContainer>
  );
};
