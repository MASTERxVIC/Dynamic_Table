import React, { useState } from 'react';
import './App.css';

function App() {
  const [columns, setColumns] = useState([]);  // List of columns
  const [rows, setRows] = useState([]);        // List of rows (array of objects)
  const [filter, setFilter] = useState({ column: "", value: "" });  // State for filtering
  const [sortOrder, setSortOrder] = useState({ column: "", condition: "none" });  // State for sorting

  // Function to add a new column
  const addColumn = () => {
    const name = prompt("Enter column name:");
    const type = prompt("Enter column type (string or number):");

    if (name && type) {
      setColumns([...columns, { name, type }]);
    }
  };

  // Function to add a new row
  const addRow = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col.name] = col.type === 'number' ? 0 : [];
      return acc;
    }, {});
    setRows([...rows, newRow]);
  };

  // Function to update a specific cell
  const updateCell = (rowIndex, colName, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][colName] = value;
    setRows(updatedRows);
  };

  // Function to filter rows
  const filterRows = () => {
    const colName = prompt("Enter column name to filter by:");
    const value = prompt("Enter value to filter by:");

    if (colName && value) {
      setFilter({ column: colName, value });
    }
  };

  // Function to sort rows by a number column
  const sortRows = () => {
    const colName = prompt("Enter column name to sort by (number column only):");
    const condition = prompt("Enter condition (>= or <=):");

    if (colName && condition) {
      setSortOrder({ column: colName, condition });
    }
  };

  return (
    <div className="App">
      <h1>Dynamic Table</h1>

      {/* Add Column Button */}
      <button onClick={addColumn}>Add Column</button>

      {/* Add Row Button */}
      <button onClick={addRow}>Add Row</button>

      {/* Filter Rows Button */}
      <button onClick={filterRows}>Filter Rows</button>

      {/* Sort Rows Button */}
      <button onClick={sortRows}>Sort Rows</button>

      {/* Table */}
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows
            .filter(row => {
              // Filtering logic
              if (!filter.column) return true;
              return Array.isArray(row[filter.column])
                ? row[filter.column].includes(filter.value)
                : row[filter.column] === filter.value;
            })
            .sort((a, b) => {
              // Sorting logic for number columns
              if (sortOrder.column && columns.find(col => col.name === sortOrder.column)?.type === "number") {
                if (sortOrder.condition === ">=") {
                  return b[sortOrder.column] - a[sortOrder.column];
                } else if (sortOrder.condition === "<=") {
                  return a[sortOrder.column] - b[sortOrder.column];
                }
              }
              return 0; // No sorting applied
            })
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type={col.type === 'number' ? 'number' : 'text'}
                      value={Array.isArray(row[col.name]) ? row[col.name].join(', ') : row[col.name]}
                      onChange={(e) =>
                        updateCell(rowIndex, col.name, col.type === 'number' ? Number(e.target.value) : e.target.value.split(', '))
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
