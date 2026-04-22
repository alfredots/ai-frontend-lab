import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SortSelect } from "./SortSelect";

describe("SortSelect", () => {
  it("changes selected value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SortSelect value="default" onChange={onChange} />);

    await user.selectOptions(screen.getByRole("combobox"), "title");

    expect(onChange).toHaveBeenCalledWith("title");
  });
});
