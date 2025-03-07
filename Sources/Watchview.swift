// Sources/WatchView.swift
import SwiftUI

struct WatchView: View {
    @StateObject private var circleManager = CircleManager.shared
    
    var body: some View {
        ScrollView {
            VStack {
                Circle()
                    .trim(from: 0.1, to: 0.9)
                    .stroke(circleManager.calculateAverageScore() > 50 ? Color.blue : Color.red, lineWidth: 4)
                    .frame(width: 50, height: 50)
                    .rotationEffect(.degrees(90))
                
                ForEach(circleManager.users) { user in
                    HStack {
                        Text(user.mood)
                            .frame(width: 20, height: 20)
                            .background(user.score > 50 ? Color.blue : Color.red)
                            .clipShape(Circle())
                        Text(user.name)
                            .font(.system(size: 14))
                    }
                    .padding(.vertical, 2)
                }
            }
        }
    }
}

struct WatchView_Previews: PreviewProvider {
    static var previews: some View {
        WatchView()
    }
}
