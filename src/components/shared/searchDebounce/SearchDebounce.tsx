import useDebounce from '@/shared/utils/hooks/useDebounce';
import SearchIcon from '@assets/img/common/search-md.svg?react';
import { cilXCircle } from '@coreui/icons-pro';
import CIcon from '@coreui/icons-react';
import { CFormInput, CInputGroup, CInputGroupText } from '@coreui/react-pro';
import { CFormInputProps } from '@coreui/react-pro/dist/esm/components/form/CFormInput';
import { useEffect, useRef, useState } from 'react';

interface ISearchDebounce extends CFormInputProps {
  setSearchKeyword: (keyword: string, name: string) => void;
  delay?: number;
  name: string;
}

// keyword
const SearchDebounce = (props: ISearchDebounce) => {
  const { value, delay, setSearchKeyword, name, ...inputProps } = props;
  const [debounceSearch, setDebounceSearch] = useState<typeof value>(value);
  const keyword = useDebounce(debounceSearch, delay ?? 1000);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    setDebounceSearch('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    setSearchKeyword(keyword, name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    return () => {
      handleClear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CInputGroup size="sm">
        <CInputGroupText>
          <SearchIcon color="inherit" stroke="currentcolor" />
        </CInputGroupText>
        <CFormInput
          onChange={(e) => {
            setDebounceSearch(e.currentTarget.value);
          }}
          ref={inputRef}
          value={debounceSearch}
          {...inputProps}
        />

        {debounceSearch ? (
          <CInputGroupText>
            <CIcon icon={cilXCircle} className='cursor-pointer' onClick={handleClear}/>
          </CInputGroupText>
        ) : (
          ''
        )}
      </CInputGroup>
    </>
  );
};

export default SearchDebounce;
