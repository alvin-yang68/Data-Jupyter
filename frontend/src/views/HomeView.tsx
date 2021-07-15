import React from "react";

const tutorialText = (
  <div>
    <h1 className="my-2 text-5xl text-center font-bold">Instructions</h1>
    <br />
    <p>
      Data Jupyter is an interactive web application for simplifying the task of
      data processing on MongoDB and PostgreSQL databases. The main interface of
      Data Jupyter is modelled after the popular Jupyter Notebook, making it
      familiar to many data analysts. Data Jupyter also offers support for data
      traceability through its integrated checkpoint system and by enforcing a
      modular style of data processing.
    </p>
    <br />
    <h2 className="my-2 text-3xl font-semibold">Loading a dataset</h2>
    <ol className="list-decimal">
      <li>
        Choose a demo dataset (e.g. nobel_prizes_incorrect) and press Select.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839332-f3ba1a80-d34b-11eb-8157-eadb74b66a2b.png"
          alt=""
        />
      </li>
      <li>
        Add a new cell in the editor by clicking the + icon.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839450-295f0380-d34c-11eb-889f-c764b61594a4.png"
          alt=""
        />
      </li>
      <li>
        In the new cell, type `show = col.find()` to make the Data Browser show
        all documents in the collection.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839489-3976e300-d34c-11eb-9a86-a827cbf29119.png"
          alt=""
        />
      </li>
      <li>
        Click the single arrow icon to run the cell.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839560-5e6b5600-d34c-11eb-82d1-1e807002b15c.png"
          alt=""
        />
      </li>
      <li>
        The data will be displayed on the Raw tab.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839638-865ab980-d34c-11eb-8de6-d7bb0b7bc4ee.png"
          alt=""
        />
      </li>
    </ol>
    <br />
    <h2 className="my-2 text-3xl font-semibold">Loading a checkpoint</h2>
    <p>
      Data traceability is a very important aspect in data analytics. Data
      Jupyter supported this by integrating a checkpoint system.
    </p>
    <ol className="list-decimal">
      <li>
        Click on the icon to the right.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839878-07b24c00-d34d-11eb-83e3-c74ebec64cc3.png"
          alt=""
        />
      </li>
      <li>
        Select the checkpoint “6/15/2021, 1:09:23 PM” and click Load.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839882-0aad3c80-d34d-11eb-8de1-05098c8e4b84.png"
          alt=""
        />
      </li>
      <li>
        The notebook state will be restored to that checkpoint.
        <img
          src="https://user-images.githubusercontent.com/72721378/122839900-139e0e00-d34d-11eb-9256-2b475d6f0404.png"
          alt=""
        />
      </li>
    </ol>
  </div>
);

export default function HomeView(): React.ReactElement {
  return (
    <div className="grid grid-cols-4">
      <div />

      <div className="col-span-2 py-8 px-12 bg-white shadow-lg rounded-lg my-20">
        {tutorialText}
      </div>

      <div />
    </div>
  );
}
