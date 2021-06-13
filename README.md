# material-ui-common-table
React Material UI common table component using hooks

To use this table you need to have material-ui.
If you don't have that, simply run the command


```sh
npm install @material-ui/core
```
Or with yarn
```sh
yarn add @material-ui/core
```

Usage with server side pagination-
```javascript
 const getData = useCallback(() => apiData?.map(obj => {
  return {
    id: obj.id,
    name: obj.name,
    address: obj.address + ' ' + obj.city + ' ' + obj.pincode,
    contact_person: obj.contact_person + ' - ' + Utils.maskMobileNumber(obj.mobile, getAccessAccordingToRole(CONSTANTS.ROLE_CONSTANTS.VIEW_MOBILE_NUMBER)),
    variants: obj.variants && obj.variants.map(item => { if (item) return item.weight }).join('/'),
    routes: obj.routes.length,
    created_at: CommonUtils.formatDateAndTime(obj.created_at),
    status: status(obj),
    call,
    actions
  }
}), [data]);

const createTableHeader = (name, id, sort = false, sortDirection = 'asc', isSorted ) => {
  return { name: name.toUpperCase(), id, sort, sortDirection, isSorted };
}

const getHeaders = useCallback(() => {
  return [
    createTableHeader('Id', 'id'),
    createTableHeader('Transporter', 'name'),
    createTableHeader('Address/Location', 'address'),
    createTableHeader('Contact Info', 'mobile'),
    createTableHeader('Truck Variants', 'variants'),
    createTableHeader('No of Routes', 'routes'),
    createTableHeader('Created On', 'created_at'),
    createTableHeader('Status', 'is_active'),
    createTableHeader('CALL INITIATE', 'call'),
    createTableHeader('Actions', 'actions')
  ]
}, [])

<CommonTable
  pagination
  paginationServer={true} //server side pagination is true here
  rows={getData()}
  headers={headers}
  rowsPerPageOptions={[25, 50, 100, { label: 'All', value: -1 }]} // rows to be shown per page
  handleChangeRowsPerPage={handleChangeRowsPerPage} // api call events for pagination
  rowsPerPage={limit}
  loading={loading}
  handleChangePage={handleChangePage} // api call events for pagination
  page={page - 1} // page starting from 0 in common table
  count={count}
/>
```

without server side pagination 
```javascript
<CommonTable
  pagination
  rows={rows}
  headers={headers}
  count={count}
  rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
  loading={loading} // if getting data from api to show loader
/>
```
