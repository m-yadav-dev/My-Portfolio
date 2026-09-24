// Implement Framer Motion in List items 




const Nav_Links_Animations = {

}

const HeaderListItems = ({ label, href, scrollTo }) => {

    const onClickNavigation = (event) => {
        scrollTo(event, href)
    }

    return (
        <li className="">
            <a
                href={href}
                id={`nav-${label.toLowerCase()}`}
                onClick={onClickNavigation}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
                {label}
            </a>
        </li>
    )
}



export default HeaderListItems