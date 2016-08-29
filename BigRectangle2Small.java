package newLight.test;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

public class BigRectangle2Small {
	public static Gson gson = new Gson();
	
	public static void main(String[] args) {
		double x1 = 3, y1 = 2, x2 = 12, y2 = 8;
		int n = 3;
		double dx = (x2 - x1) / n;
		double dy = (y2 - y1) / n;
		List<double[]> list = new ArrayList<double[]>();
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				double[] p = new double[4];
				p[0] = x1 + i * dx;
				p[1] = y1 + j * dy;
				p[2] = p[0] + dx;
				p[3] = p[1] + dy;
				list.add(p);
			}
		}
		
		System.out.println(gson.toJson(list));
	}
}
