import styles from './Dashboard.module.css';

const Dashboard = () => {
  // Dummy data for the table
  const ordersData = [
    {
      column1: 'test1',
      column2: 'test2',
      column3: 'test3',
      column4: 'test4',
      column5: 'test5',
      column6: 'test6',
      column7: 'test7',
      column8: 'test8',
      column9: 'test9',
      column10: 'test10',
      column11: 'test11',
      column12: 'test12',
      column13: 'test13',
      column14: 'test14',
      column15: 'test15',
    },
    // Include 15 columns of data for each order
    // { column1: value1, column2: value2, ..., column15: value15 }
    // ...
  ];

  const tableHeaders = Object.keys(ordersData[0] || {});

  return (
    <div className={styles.dashboard}>
      <h2 className={styles.heading}>Order Dashboard</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, index) => (
              <tr key={index}>
                {tableHeaders.map((header) => (
                  <td key={header}>{order[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
