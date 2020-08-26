import InactiveIssuersText from "./inactive-issuers.txt";

const ARCHIVED_NAMES = InactiveIssuersText.split(/\r?\n/g).map(line => line.trim());

export default ARCHIVED_NAMES;
