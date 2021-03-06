import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Purchases and credits in year',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Purchases',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Credits',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const Logs = () => {

  return (
    <div className="content">
      <main>
        <section className="page-section">
          <Row className='m-5'>
            <Col>
              <Bar options={options} data={data} />
            </Col>
          </Row>
        </section>
      </main>
    </div>
  );
};

export default Logs;
