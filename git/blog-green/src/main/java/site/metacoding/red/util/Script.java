package site.metacoding.red.util;

public class Script {
	
	public static String back(String msg) {
		StringBuilder sb = new StringBuilder();
		sb.append("<script>");
		sb.append("alert('"+msg+"');");	// 메시지 띄우는 코드
		sb.append("history.back();");	// 뒤로가기
		sb.append("</script>");
		return sb.toString();
	}
	
	public static String href(String url) {
		StringBuilder sb = new StringBuilder();
		sb.append("<script>");
		sb.append("location.href='"+url+"';");	// 해당 url로 이동해주는 코드
		sb.append("</script>");
		return null;
	}
	
	public static String href(String url, String msg) {
		StringBuilder sb = new StringBuilder();
		sb.append("<script>");
		sb.append("alert('"+msg+"');");
		sb.append("location.href='"+url+"';");	
		sb.append("</script>");
		return null;
	}
}
