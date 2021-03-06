import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { changeNum2Cur } from '../utils/formatNumber';
import ButtonNewAdvert from '../shared/ButtonNewAdvert';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(5),
    maxWidth: 1500,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  priceColumn: {
    textAlign: 'right',
  },
  textColumn: {
    textAlign: 'center',
  },
  tableRow: {
    cursor: 'pointer',
  },
  noAdverts: {
    '& > h2': {
      marginBottom: theme.spacing(2),
    },
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

const TableAdverts = ({ adverts, history }) => {
  const classes = useStyles();

  const renderAdverts = () => {
    if (!adverts || adverts.length === 0)
      return (
        <TableRow>
          <TableCell colSpan="4" align="center">
            <div className={classes.noAdverts}>
              <h2>No hay anuncios</h2>
              <ButtonNewAdvert />
            </div>
          </TableCell>
        </TableRow>
      );

    return adverts.map(advert => (
      <TableRow
        className={classes.tableRow}
        hover
        key={advert._id}
        onClick={() => history.push(`/advert/${advert._id}`)}
      >
        <TableCell className={classes.textColumn}>{advert.name}</TableCell>
        <TableCell className={classes.priceColumn}>
          {changeNum2Cur(advert.price)}
        </TableCell>
        <TableCell className={classes.textColumn}>
          {advert.sale ? 'Venta' : 'Compra'}
        </TableCell>
        <TableCell className={classes.textColumn}>
          {advert.tags.join(', ')}
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Card className={classes.root}>
      <PerfectScrollbar>
        <Box minWidth={1000}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.textColumn}>Nombre</TableCell>
                <TableCell className={classes.priceColumn}>Precio</TableCell>
                <TableCell className={classes.textColumn}>
                  Venta/Compra
                </TableCell>
                <TableCell className={classes.textColumn}>Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{renderAdverts()}</TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

TableAdverts.propTypes = {
  adverts: PropTypes.array.isRequired,
};

export default TableAdverts;
