export const ExpandableForm = () => {
    const [expandGemForm, setExpandGemForm] = useState(null);

    function expandForm(event) {
        event.preventDefault();
        setExpandGemForm(true)
      }
    
      function closeForm(event) {
        event.preventDefault()
        setExpandGemForm(false)
      }
}