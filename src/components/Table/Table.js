import React, { useState } from 'react';
import { useEffect } from 'react';
import { camelCaseToNormalWords, getColumnNamesFromEntityKeys } from '../../utils/Utils';

const Table = props => {
    const [columnNames, setColumnNames] = useState([]);

    useEffect(() => {

        if(props.entities.length != 0){
            const columns = getColumnNamesFromEntityKeys(props.entities[0]);
            console.log("columns: ", columns);

            let rightColumnNames = [];

            columns.map(column => {
                rightColumnNames.push(camelCaseToNormalWords(column));
            });

            setColumnNames(rightColumnNames);
            
        }

    }, [props]);

    return (
        <table className="table">
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
                            <td>{props.actions}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default Table;