function skillsMember()
{
    var member = document.getElementById("member").value;
    var memberError = document.getElementById("memberError");
    var memberRegExp = /^[a-zA-Z ]{2,30}$/;
    if(memberRegExp.test(member))
    {
        memberError.innerHTML = "";
        return true;
    }
    else
    {
        memberError.innerHTML = "Please enter a valid member name";
        return false;
    }
}
