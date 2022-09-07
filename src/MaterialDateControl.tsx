/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import {
  and,
  ControlProps,
  isDescriptionHidden,
  RankedTester,
  rankWith,
  schemaMatches,
  schemaTypeIs,
  uiTypeIs,
} from '@jsonforms/core';
import {
  createOnChangeHandler,
  getData,
  useFocus,
} from '@jsonforms/material-renderers';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { FormHelperText, Hidden, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import merge from 'lodash/merge';
import { useMemo } from 'react';

export const MaterialDateControl = (props: ControlProps) => {
  const [focused, onFocus, onBlur] = useFocus();
  const {
    description,
    id,
    errors,
    label,
    uischema,
    visible,
    enabled,
    required,
    path,
    handleChange,
    data,
    config,
  } = props;
  const isValid = errors.length === 0;
  const appliedUiSchemaOptions = merge({}, config, uischema.options);
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    focused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );

  const format = appliedUiSchemaOptions.dateFormat ?? 'YYYY-MM-DD';
  const saveFormat = appliedUiSchemaOptions.dateSaveFormat ?? 'YYYY-MM-DD';

  const views = appliedUiSchemaOptions.views ?? ['year', 'day'];

  const firstFormHelperText = showDescription
    ? description
    : !isValid
    ? errors
    : null;
  const secondFormHelperText = showDescription && !isValid ? errors : null;
  const onChange = useMemo(
    () => createOnChangeHandler(path, handleChange, saveFormat),
    [path, handleChange, saveFormat]
  );

  const value = getData(data, saveFormat);
  const valueInInputFormat = value ? value.format(format) : '';

  return (
    <Hidden xsUp={!visible}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label='Date desktop'
          inputFormat={format}
          value={value}
          onChange={onChange as any}
          renderInput={(params) => <TextField {...params} />}
        />
        <FormHelperText error={!isValid && !showDescription}>
          {firstFormHelperText}
        </FormHelperText>
        <FormHelperText error={!isValid}>{secondFormHelperText}</FormHelperText>
      </LocalizationProvider>
    </Hidden>
  );
};

export const materialDateControlTester: RankedTester = rankWith(
  100,
  and(
    uiTypeIs('Control'),
    schemaTypeIs('string'),
    schemaMatches((schema) => {
      if (schema.hasOwnProperty('customRender')) {
        let cellschema: any = schema;
        return cellschema['customRender'] === 'MaterialDateControl';
      }
      return false;
    })
  )
);

export default withJsonFormsControlProps(MaterialDateControl);
