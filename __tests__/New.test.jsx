// src/__tests__/New.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  connectFirestoreEmulator,
  deleteDoc,
} from "firebase/firestore";
import New from "../src/Page/New/New";
import { app } from "../src/config/firebase";

describe("New component", () => {
  beforeAll(async () => {
    // Initialize Firestore emulator
    const db = getFirestore(app);
    connectFirestoreEmulator(db, "localhost", 8080);
  });

  beforeEach(async () => {
    // Clear Firestore data before each test
    const db = getFirestore(app);
    const figuresCollection = collection(db, "Figure-List");
    const querySnapshot = await getDocs(figuresCollection);
    const promises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(promises);
  });

  test("renders figures when data is fetched successfully", async () => {
    // Set up mock data
    const db = getFirestore(app);
    const figuresCollection = collection(db, "Figure-List");
    const mockFigures = [
      {
        Name: "Figure 1",
        Image: "https://example.com/image1.jpg",
        Price: 10.99,
        ReleaseDate: new Date("2023-06-01"),
        Status: true,
        Stock: 5,
        Tag: ["tag1", "tag2"],
      },
      {
        Name: "Figure 2",
        Image: "https://example.com/image2.jpg",
        Price: 19.99,
        ReleaseDate: new Date("2023-07-01"),
        Status: false,
        Stock: 0,
        Tag: ["tag3", "tag4"],
      },
    ];

    // Add mock data to Firestore emulator
    for (const figure of mockFigures) {
      await addDoc(figuresCollection, figure);
    }

    // Render the component
    render(
      <BrowserRouter>
        <New />
      </BrowserRouter>
    );

    // Assert that the figures are rendered
    await waitFor(() => {
      expect(screen.getByText("Figure 1")).toBeInTheDocument();
      expect(screen.getByText("Price: 10.99")).toBeInTheDocument();
      expect(screen.getByText("Figure 2")).toBeInTheDocument();
      expect(screen.getByText("Price: 19.99")).toBeInTheDocument();
      expect(screen.getByText("Sold out")).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
  // ...
});