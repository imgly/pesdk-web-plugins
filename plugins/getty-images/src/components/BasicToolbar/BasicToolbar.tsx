import React, { useContext } from 'react';

import { SearchField } from 'photoeditorsdk';

import { Basic, NoResults, Spinner } from '../Elements';
import { GettyImagesCards } from '../GettyImagesCards';
import { SearchContext } from '../../context/SearchContext';
import { ToolbarUiProps } from '../types';
import { LanguageContext } from '../../context/LanguageContext';

export const BasicToolbar = ({
  loading,
  loadingRef,
  pages,
  placeholder = '',
  setImage,
}: ToolbarUiProps): JSX.Element => {
  const { phrase, debouncedPhrase, setPhrase } = useContext(SearchContext);
  const { noResults } = useContext(LanguageContext);

  const hasPages = Boolean(pages.length);
  const hasResults = pages[0]?.result_count > 0;

  return (
    <Basic.ToolbarWrapper>
      <Basic.SearchDiv>
        <SearchField
          value={phrase}
          onChange={setPhrase}
          placeholder={placeholder}
        />
      </Basic.SearchDiv>
      <Basic.ScrollContainer>
        <Basic.CardContainer>
          {hasResults &&
            pages.map((group, i) => (
              <GettyImagesCards
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                images={group.images}
                onClick={setImage}
                CardComponent={Basic.Card}
              />
            ))}
          {hasPages && !hasResults && noResults && (
            <NoResults>
              {noResults.replace('{phrase}', debouncedPhrase)}
            </NoResults>
          )}
          {loading && <Spinner />}
          {hasResults ? <div ref={loadingRef} /> : undefined}
        </Basic.CardContainer>
      </Basic.ScrollContainer>
    </Basic.ToolbarWrapper>
  );
};
