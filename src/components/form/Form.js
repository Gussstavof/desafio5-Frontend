import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';

function Form() {
    const [transfers, setTransfers] = useState([]);
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const fetchData = async () => {
        try {
            const url = `http://localhost:8080/bank/v1/transfers`;
            const response = await axios.get(url, {
                params: {
                    name,
                    start: start ? start + 'T00:00:00' : undefined,
                    end: end ? end + 'T00:00:00' : undefined
                },
            });

            const data = response.data;
            setTransfers(data);
        } catch (error) {
            console.error('Error fetching transfers:', error);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const handleAccountChange = (e) => {
        setName(e.target.value);
    };

    const handleStartChange = (e) => {
        setStart(e.target.value);
    };

    const handleEndChange = (e) => {
        setEnd(e.target.value);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} className="text-center pt-5 px-3">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <input
                            type="date"
                            className="form-control"
                            value={start}
                            onChange={handleStartChange}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            type="date"
                            className="form-control"
                            value={end}
                            onChange={handleEndChange}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            value={name}
                            onChange={handleAccountChange}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Pesquisar
                </button>
            </form>
            <table className="table mt-3">
                <thead>
                <tr>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Tipo</th>
                    <th>Operador</th>
                </tr>
                </thead>
                <tbody>
                {transfers.map((transfer) => (
                    <tr key={transfer.id}>
                        <td>
                            {new Date(
                                transfer.transferDate[0],
                                transfer.transferDate[1] - 1,
                                transfer.transferDate[2]
                            ).toLocaleDateString('en-US')}
                        </td>
                        <td>{transfer.value}</td>
                        <td>{transfer.type}</td>
                        <td>{transfer.account.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Form;