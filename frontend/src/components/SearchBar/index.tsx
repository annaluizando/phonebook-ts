import magnifierIcon from '@assets/Magnifier.svg';
import { SearchBarProps } from '../../types/SearchBarProps';

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative w-full max-w-[500px] mx-auto">
            <img alt="magnifier" className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 opacity-60" src={magnifierIcon} draggable={false} />
            <input
                type="text"
                className="bg-white w-full px-8 py-2 border border-gray-300 rounded shadow-inner text-base transition duration-300 ease-in-out focus:border-gray-500 focus:outline-none placeholder:text-gray-500"
                placeholder="Search for contact by last name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};
