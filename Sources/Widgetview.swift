// Sources/WidgetView.swift
import SwiftUI

struct WidgetView: View {
    let averageScore: Int
    
    var body: some View {
        ZStack {
            Circle()
                .trim(from: 0.1, to: 0.9)
                .stroke(averageScore > 50 ? Color.blue : Color.red, lineWidth: 8)
                .frame(width: 100, height: 100)
                .rotationEffect(.degrees(90))
            
            Text("WellNest")
                .font(.caption)
                .foregroundColor(.white)
                .offset(y: 60)
        }
        .background(Color.black.opacity(0.8))
    }
}

struct WidgetView_Previews: PreviewProvider {
    static var previews: some View {
        WidgetView(averageScore: 50)
    }
}
