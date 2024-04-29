// src/__tests__/New.test.jsx

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import New from "../src/Page/New/New";
const { initializeTestEnvironment } = require('@firebase/rules-unit-testing');
describe("New component", () => {
  let testEnv;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: "your-project-id",
      auth: { uid: "test-user" },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    // Clear Firestore data before each test
    await testEnv.clearFirestore();
  });

  test("renders figures when data is fetched successfully", async () => {
    const db = testEnv.firestore();
    const figuresCollection = collection(db, "Figure-List");

    // Set up mock data
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

    // Add mock data to Firestore
    for (const figure of mockFigures) {
      await assertSucceeds(figuresCollection.add(figure));
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