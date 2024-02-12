import { FormControl, InputGroup,DropdownButton, Dropdown} from "react-bootstrap";
import { BsCheck2 } from "react-icons/bs";


const DropDown =( {onSortByChange , sortBy, orderBy, onOrderByChange} ) => {
  return (
    <>
      <DropdownButton
          variant="info"
          title="Sort">
          <Dropdown.Item href="#" onClick={() =>onSortByChange('firstName')}> First Name {(sortBy == 'firstName')&&  <BsCheck2 className="float-end " />}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() =>onSortByChange('lastName')}> Last Name {(sortBy == 'lastName')&&  <BsCheck2 className="float-end " />}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() =>onSortByChange('aptDate')}> Date {(sortBy == 'aptDate')&&  <BsCheck2 className="float-end " />}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#" onClick={() =>onOrderByChange('asc')}> Ascending {(orderBy == 'asc')&&  <BsCheck2 className="float-end " />}</Dropdown.Item>
          <Dropdown.Item href="#" onClick={() =>onOrderByChange('desc')}> Descinding {(orderBy == 'desc')&&  <BsCheck2 className="float-end " />}</Dropdown.Item>
        </DropdownButton>
    </>
  );
}

const Search = ({onQueryChange, query, orderBy, onOrderByChange, sortBy, onSortByChange}) => {
  return(
    <>
      <InputGroup className="mb-3">
        <FormControl placeholder="Search" onChange={(event) =>{
          onQueryChange(event.target.value)
        }} value={query}/>
        <DropDown
        sortBy = {sortBy}
        onSortByChange = {mySort => onSortByChange(mySort)}
        orderBy = {orderBy}
        onOrderByChange = {myOrder => onOrderByChange(myOrder)} />
      </InputGroup>
    </>
  );
}

export default Search;