import React, { useState } from 'react';
import { data } from '../utils/data';
import './Datatable.css';

function DataTable() {
  //Deduction amount
  const [deductionAmounts, setDeductionAmounts] = useState([]);
  //update data 
  const [updatedData, setUpdatedData] = useState(data);

  const handleDeduction = (index) => {
    // Calculate the new due amount after deduction
    const updatedDueAmount = updatedData[index].invoiceDetail.amountDue - deductionAmounts[index];

    // Create a copy of the data and update the due amount
    const newData = [...updatedData];
    newData[index].invoiceDetail.amountDue = updatedDueAmount;

    setUpdatedData(newData);
  };

  const handleDeductionChange = (index, amount) => {
    // Update the deduction amount for the specific row
    const newDeductionAmounts = [...deductionAmounts];
    newDeductionAmounts[index] = amount;
    setDeductionAmounts(newDeductionAmounts);
  };
  const totalPayableAmount = data.reduce((total, item) => total + item.payableAmount, 0);
  const totalDuesPending = data.reduce((total, item) => total + item.invoiceDetail.amountDue, 0);


  return (
    <div>
      <div className="table container mx-5 my-3 text-center">
        {/* Display data */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Id/ Serial Number</th>
              <th scope="col">Company Name</th>
              <th scope="col">Quantity of resourceAlias booked</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Payable Amount</th>
              <th scope="col">Due / Pending Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {updatedData.map((item, index) => {
              return (
                <tr key={index} className={item.paymentStatus === 'Pending' ? 'text-danger' : 'text-success'}>
                  <td>{item._id}</td>
                  <td>{item.companyName}</td>
                  <td className="hoverable-cell">
                    {item.resourceAlias.length}
                    <div className="resource-alias-tooltip">
                      {item.resourceAlias.map((alias, index) => (
                        <p key={index}>{alias}</p>
                      ))}
                    </div>
                  </td>
                  <td>{item.paymentStatus}</td>
                  <td>{item.payableAmount}</td>
                  <td>{item.invoiceDetail.amountDue}</td>
                  <td>
                    {/* Action Button for amount deducation */}
                    <div>
                      <input
                        type="number"
                        placeholder="Deduction Amount"
                        value={deductionAmounts[index]}
                        onChange={(e) => handleDeductionChange(index, Number(e.target.value))}
                      />
                      <button onClick={() => handleDeduction(index)}>Deduct</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        <div>
          <h3 className='text-center'>Total Payable Amount: ${totalPayableAmount}</h3>
        </div>
        <div>
          <h3 className='text-center'>Total Dues Pending: ${totalDuesPending}</h3>
        </div>
      </div>
  );
}

export default DataTable;
