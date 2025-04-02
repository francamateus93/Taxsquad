import { Link } from "react-router-dom";
import Button from "../../../components/ui/button/ButtonPrimary";
import ButtonSecondary from "../../../components/ui/button/ButtonSecondary";

const TaxFormActions = () => (
  <div className="col-span-2 flex justify-between items-center gap-4 mt-4">
    <div className="flex gap-4">
      <Button type="submit">Save Tax</Button>
      <Link to="/taxes">
        <button
          type="button"
          className="px-6 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-200 transition duration-200 text-base cursor-pointer"
        >
          Cancel
        </button>
      </Link>
    </div>
    <Link to="/taxes">
      <ButtonSecondary type="button">Back</ButtonSecondary>
    </Link>
  </div>
);

export default TaxFormActions;
