/**
 * Node Modules
 */
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";

const Searchbar = () => {
  return (
    <form
      action="/search"
      className="border-app-300 flex items-center rounded-md border"
    >
      <MagnifyingGlassIcon
        weight="duotone"
        className="text-app-300 ml-3 size-4"
      />
      <input
        type="text"
        name="q"
        id="serch"
        className="w-full px-3 py-2 focus:outline-0"
        placeholder="Search project's name"
      />
    </form>
  );
};

export default Searchbar;
