import React from 'react';

import { getLastestAnuncios } from '../anuncios/service';
import CheckboxGroup from './CheckBoxGroup';
import useQuery from '../../utils/useQuery';

function SelectTags(props) {
  const { data: tags = [] } = useQuery(getLastestAnuncios);
  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;