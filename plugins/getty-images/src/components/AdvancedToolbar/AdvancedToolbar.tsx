import React, { useContext } from 'react';

import { AdvancedUIItemCard, SearchField } from 'photoeditorsdk';

import { ToolbarUiProps } from '../types';
import { Spinner, Advanced, NoResults } from '../Elements';
import { GettyImagesCards } from '../GettyImagesCards';

import { AdvancedFilter } from '../AdvancedFilter';
import { SearchContext } from '../../context/SearchContext';
import { LanguageContext } from '../../context/LanguageContext';

export const AdvancedToolbar = ({
  loading,
  loadingRef,
  pages,
  placeholder = '',
  setImage,
  showFilters = false,
}: ToolbarUiProps): JSX.Element => {
  const { setPhrase, phrase, debouncedPhrase } = useContext(SearchContext);
  const { noResults } = useContext(LanguageContext);

  const hasPages = Boolean(pages.length);
  const hasResults = pages[0]?.result_count > 0;

  return (
    <Advanced.ToolbarWrapper>
      <Advanced.SearchDiv>
        <SearchField
          value={phrase}
          onChange={setPhrase}
          placeholder={placeholder}
        />
      </Advanced.SearchDiv>
      {showFilters && <AdvancedFilter />}
      <Advanced.ScrollContainer>
        <Advanced.CardContainer data-test="GettyCardContainer">
          {hasResults &&
            pages.map((group, i) => (
              <GettyImagesCards
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                images={group.images}
                onClick={setImage}
                CardComponent={AdvancedUIItemCard}
              />
            ))}
          {hasPages && !hasResults && noResults && (
            <NoResults>
              {noResults.replace('{phrase}', debouncedPhrase)}
            </NoResults>
          )}
          {loading && <Spinner />}
          {hasResults ? <div ref={loadingRef} /> : undefined}
        </Advanced.CardContainer>
      </Advanced.ScrollContainer>
    </Advanced.ToolbarWrapper>
  );
};
