import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import React from "react";

// Default mocks for non-admin rendering
vi.mock("../../context/AuthContext.jsx", () => ({
  useAuth: () => ({ isAuthed: false, isAdmin: false, signout: vi.fn() }),
}));
vi.mock("../../context/ThemeContext.jsx", () => ({
  useTheme: () => ({ theme: "light", toggle: vi.fn() }),
}));

import Navbar from "../Navbar.jsx";

describe("Navbar", () => {
  test("renders public links and auth links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("shows Admin link when user is admin", async () => {
    vi.resetModules();
    vi.doMock("../../context/AuthContext.jsx", () => ({
      useAuth: () => ({ isAuthed: true, isAdmin: true, signout: vi.fn() }),
    }));
    vi.doMock("../../context/ThemeContext.jsx", () => ({
      useTheme: () => ({ theme: "dark", toggle: vi.fn() }),
    }));
    const NavbarAdmin = (await import("../Navbar.jsx")).default;

    render(
      <MemoryRouter>
        <NavbarAdmin />
      </MemoryRouter>
    );
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });
});


