import React, { useState } from 'react';
import { useEffect } from 'react';
import { camelCaseToNormalWords, getColumnNamesFromEntityKeys } from '../../utils/Utils';
import { Button } from '../Button/Button';

const Table = props => {
    const [columnNames, setColumnNames] = useState([]);
    
    useEffect(() => {

        if(props.entities.length !== 0){
            const columns = getColumnNamesFromEntityKeys(props.entities[0]);

            let rightColumnNames = [];

            columns.forEach(column => {
                rightColumnNames.push(camelCaseToNormalWords(column));
            });

            setColumnNames(rightColumnNames);
            
        }

    }, [props]);

    const renderAction = (action, id) => {
        return(
            <td><Button title={action.title} className="btn btn-outline-primary" onClick={() => action.handler(id)} /></td>
        )
    };

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    {columnNames.map((column, index) => <th key={ index + column } > {column} </th>)}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.entities.map(entity => 
                        <tr key={entity.id}>
                            {Array.from(Object.keys(entity)).map((field, index) =>
                                    
                                <td key = {Math.random() + index}> { entity[field] } </td>

                            )}
                            { props.action && renderAction(props.action, entity.id) }
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default Table;