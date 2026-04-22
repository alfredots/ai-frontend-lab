import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function Wrapper() {
      const [value, setValue] = useState("");

      return (
        <SearchBar
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            onChange(nextValue);
          }}
        />
      );
    }

    render(<Wrapper />);

    await user.type(screen.getByRole("textbox"), "hades");

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith("hades");
  });
});
